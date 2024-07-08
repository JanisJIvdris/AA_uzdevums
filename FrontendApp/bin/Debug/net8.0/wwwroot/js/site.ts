document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const table = document.getElementById('recordsTable')!;
    const pageSizeSelect = document.getElementById('pageSize') as HTMLSelectElement;
    const prevPageButton = document.getElementById('prevPage')!;
    const nextPageButton = document.getElementById('nextPage')!;
    const currentPageSpan = document.getElementById('currentPage')!;

    if (!searchInput || !table || !pageSizeSelect || !prevPageButton || !nextPageButton || !currentPageSpan) {
        console.error('One or more elements were not found in the DOM.');
        return;
    }

    let records: HTMLElement[] = Array.from(table.querySelectorAll('tbody tr'));
    let currentPage = 1;
    let pageSize = parseInt(pageSizeSelect.value, 10);

    const renderTable = () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredRecords = records.filter(record => {
            return Array.from(record.querySelectorAll('td')).some(td => td.textContent?.toLowerCase().includes(searchText));
        });

        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;

        records.forEach(record => (record.style.display = 'none'));
        filteredRecords.slice(start, end).forEach(record => (record.style.display = ''));

        currentPageSpan.textContent = currentPage.toString();
    };

    searchInput.addEventListener('input', renderTable);
    pageSizeSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        pageSize = parseInt(target.value, 10);
        renderTable();
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextPageButton.addEventListener('click', () => {
        const maxPage = Math.ceil(records.length / pageSize);
        if (currentPage < maxPage) {
            currentPage++;
            renderTable();
        }
    });

    // Add record functionality
    const addRecordForm = document.getElementById('addRecordForm') as HTMLFormElement;
    if (!addRecordForm) {
        console.error('Add record form not found');
        return;
    }

    addRecordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameElement = document.getElementById('newName') as HTMLInputElement;
        const descriptionElement = document.getElementById('newDescription') as HTMLInputElement;

        if (!nameElement || !descriptionElement) {
            console.error('Form elements not found.');
            return;
        }

        const name = nameElement.value;
        const description = descriptionElement.value;

        console.log('Adding new record:', { name, description });

        try {
            const response = await fetch('https://localhost:7112/api/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description })
            });

            if (response.ok) {
                const newRecord = await response.json();
                const createdDate = new Date(newRecord.createdDate).toLocaleDateString('en-CA'); // Format date as YYYY-MM-DD
                const row = document.createElement('tr');
                row.setAttribute('data-id', newRecord.id);
                row.innerHTML = `
                    <td>${newRecord.id}</td>
                    <td contenteditable="true" class="editable" data-field="name">${newRecord.name}</td>
                    <td contenteditable="true" class="editable" data-field="description">${newRecord.description}</td>
                    <td>${createdDate}</td>
                    <td>
                        <button class="save-btn btn btn-success">Save</button>
                        <button class="delete-btn btn btn-danger">Delete</button>
                    </td>
                `;
                table.querySelector('tbody')!.appendChild(row);
                records = Array.from(table.querySelectorAll('tbody tr'));
                renderTable();
            } else {
                console.error('Failed to add new record:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding new record:', error);
        }
    });

    // Edit and delete functionality
    table.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;
        const row = target.closest('tr');
        if (!row) {
            console.error('Row not found');
            return;
        }
        const id = row.getAttribute('data-id');
        if (!id) {
            console.error('ID not found');
            return;
        }

        if (target.classList.contains('save-btn')) {
            const nameElement = row.querySelector('[data-field="name"]') as HTMLElement;
            const descriptionElement = row.querySelector('[data-field="description"]') as HTMLElement;

            if (!nameElement || !descriptionElement) {
                console.error('Form elements not found.');
                return;
            }

            const name = nameElement.innerText;
            const description = descriptionElement.innerText;

            console.log('Saving record:', { id, name, description });

            try {
                const response = await fetch(`https://localhost:7112/api/records/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, name, description })
                });

                if (response.ok) {
                    alert('Record updated successfully');
                } else {
                    alert('Failed to update record');
                }
            } catch (error) {
                console.error('Error updating record:', error);
            }
        }

        if (target.classList.contains('delete-btn')) {
            console.log('Deleting record:', id);

            try {
                const response = await fetch(`https://localhost:7112/api/records/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    row.remove();
                    records = Array.from(table.querySelectorAll('tbody tr'));
                    renderTable();
                } else {
                    alert('Failed to delete record');
                }
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    });

    renderTable();
});
