document.addEventListener('DOMContentLoaded', () => {
    const inventoryDiv = document.getElementById('inventory');
    const addForm = document.getElementById('addForm');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');
  
    const fetchInventory = () => {
      fetch('http://localhost:3000/items')
        .then(response => response.json())
        .then(data => {
          let table = '<table border="1"><tr><th>ID</th><th>Name</th><th>Description</th><th>Quantity</th><th>Price</th></tr>';
          data.forEach(item => {
            table += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.description}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`;
          });
          table += '</table>';
          inventoryDiv.innerHTML = table;
        });
    };
  
    fetchInventory();
  
    addForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(addForm);
      fetch('http://localhost:3000/add', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.text())
        .then(data => {
          alert(data);
          fetchInventory();
          addForm.reset();
        });
    });
  
    updateForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(updateForm);
      fetch('http://localhost:3000/update', {
        method: 'PUT',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.text())
        .then(data => {
          alert(data);
          fetchInventory();
          updateForm.reset();
        });
    });
  
    deleteForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(deleteForm);
      fetch('http://localhost:3000/delete', {
        method: 'DELETE',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.text())
        .then(data => {
          alert(data);
          fetchInventory();
          deleteForm.reset();
        });
    });
  });