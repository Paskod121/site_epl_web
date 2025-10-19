document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('inscription-form');
  const previewBtn = document.getElementById('preview-btn');
  const summary = document.getElementById('inscription-summary');
  const summaryContent = document.getElementById('summary-content');
  const closeSummary = document.getElementById('close-summary');
  const bacSelect = document.getElementById('bac');
  const bacAutreGroup = document.getElementById('bac-autre-group');
  const bacAutreInput = document.getElementById('bac_autre');
  const filesInput = document.getElementById('files_upload');
  const fileList = document.getElementById('file-list');
  const fileChooserText = document.getElementById('file-chooser-text');

  function gatherFormData() {
    const fd = new FormData(form);
    const obj = {};
    for (const [k, v] of fd.entries()) obj[k] = v;
    return obj;
  }

  function renderSummary(data) {
    // prepare file list HTML if present
    let filesHtml = '';
    if (data.__files && data.__files.length) {
      filesHtml = '<h4>Fichiers joints</h4><ul>' + data.__files.map(f => `<li>${f}</li>`).join('') + '</ul>';
    }
    const html = `
      <dl>
        <dt>Prénom</dt><dd>${data.prenom || '—'}</dd>
        <dt>Nom</dt><dd>${data.nom || '—'}</dd>
        <dt>Email</dt><dd>${data.email || '—'}</dd>
        <dt>Téléphone</dt><dd>${data.telephone || '—'}</dd>
        <dt>Date de naissance</dt><dd>${data.date_naissance || '—'}</dd>
        <dt>Série Bac</dt><dd>${data.bac || '—'}</dd>
        <dt>Année Bac</dt><dd>${data.annee_bac || '—'}</dd>
        <dt>Moyenne</dt><dd>${data.moyenne || '—'}</dd>
        <dt>Filière souhaitée</dt><dd>${data.filiere || '—'}</dd>
      </dl>
      ${filesHtml}
    `;
    summaryContent.innerHTML = html;
  }

  previewBtn.addEventListener('click', function () {
    // Clear previous errors
    clearFieldErrors();
    if (!form.checkValidity()) {
      showFieldErrors();
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const data = gatherFormData();
    // include files selected
    data.__files = collectSelectedFiles();
    renderSummary(data);
    summary.hidden = false;
  });

  closeSummary.addEventListener('click', function () {
    summary.hidden = true;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Simple validation
    clearFieldErrors();
    if (!form.checkValidity()) {
      showFieldErrors();
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const data = gatherFormData();

    // Ici on pourrait poster via fetch() vers une API PHP/endpoint
    // Pour l'instant on simule une soumission réussie
    console.log('Soumission formulaire', data);

    // Montrer confirmation
    data.__files = collectSelectedFiles();
    renderSummary(data);
    summary.hidden = false;
    summaryContent.insertAdjacentHTML('afterbegin', '<p class="success">Votre candidature a été préparée. (Simulation)</p>');
  });

  function clearFieldErrors() {
    form.querySelectorAll('.error-message').forEach(n => n.remove());
    form.querySelectorAll('.error').forEach(n => n.classList.remove('error'));
  }

  function showFieldErrors() {
    const invalids = Array.from(form.querySelectorAll(':invalid'));
    invalids.forEach(field => {
      field.classList.add('error');
      const msg = document.createElement('div');
      msg.className = 'error-message';
      msg.textContent = field.validationMessage || 'Champ invalide';
      // insert after field
      field.parentNode.appendChild(msg);
    });
  }

  // Display conditional field if 'Autre' selected
  function onBacChange() {
    if (!bacSelect) return;
    if (bacSelect.value === 'Autre') {
      bacAutreGroup.classList.remove('hidden');
      bacAutreInput.setAttribute('required', 'required');
    } else {
      bacAutreGroup.classList.add('hidden');
      bacAutreInput.removeAttribute('required');
      bacAutreInput.value = '';
    }
  }

  if (bacSelect) bacSelect.addEventListener('change', onBacChange);
  // initial state
  onBacChange();

  // Files handling
  function collectSelectedFiles() {
    const out = [];
    if (filesInput && filesInput.files && filesInput.files.length) {
      for (const f of filesInput.files) out.push(f.name);
    }
    return out;
  }

  function renderFileList() {
    fileList.innerHTML = '';
    const files = collectSelectedFiles();
    if (!files.length) {
      fileChooserText.textContent = 'Aucun fichier sélectionné';
      return;
    }
    fileChooserText.textContent = `${files.length} fichier(s) sélectionné(s)`;
    for (const f of files) {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.textContent = f;
      fileList.appendChild(item);
    }
  }

  if (filesInput) filesInput.addEventListener('change', renderFileList);

  // Delegated listener: ensure close button works even if the node is re-rendered
  document.addEventListener('click', function (e) {
    const target = e.target;
    if (!target) return;
    if (target.id === 'close-summary' || target.closest && target.closest('#close-summary')) {
      summary.hidden = true;
      // return focus to preview button for accessibility
      if (previewBtn) previewBtn.focus();
    }
  });

  // Close summary with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && summary && !summary.hidden) {
      summary.hidden = true;
      if (previewBtn) previewBtn.focus();
    }
  });
});
