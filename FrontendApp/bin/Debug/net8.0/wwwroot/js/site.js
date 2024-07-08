"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('search');
    var table = document.getElementById('recordsTable');
    var pageSizeSelect = document.getElementById('pageSize');
    var prevPageButton = document.getElementById('prevPage');
    var nextPageButton = document.getElementById('nextPage');
    var currentPageSpan = document.getElementById('currentPage');
    if (!searchInput || !table || !pageSizeSelect || !prevPageButton || !nextPageButton || !currentPageSpan) {
        console.error('One or more elements were not found in the DOM.');
        return;
    }
    var records = Array.from(table.querySelectorAll('tbody tr'));
    var currentPage = 1;
    var pageSize = parseInt(pageSizeSelect.value, 10);
    var renderTable = function () {
        var searchText = searchInput.value.toLowerCase();
        var filteredRecords = records.filter(function (record) {
            return Array.from(record.querySelectorAll('td')).some(function (td) { var _a; return (_a = td.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchText); });
        });
        var start = (currentPage - 1) * pageSize;
        var end = start + pageSize;
        records.forEach(function (record) { return (record.style.display = 'none'); });
        filteredRecords.slice(start, end).forEach(function (record) { return (record.style.display = ''); });
        currentPageSpan.textContent = currentPage.toString();
    };
    searchInput.addEventListener('input', renderTable);
    pageSizeSelect.addEventListener('change', function (e) {
        var target = e.target;
        pageSize = parseInt(target.value, 10);
        renderTable();
    });
    prevPageButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });
    nextPageButton.addEventListener('click', function () {
        var maxPage = Math.ceil(records.length / pageSize);
        if (currentPage < maxPage) {
            currentPage++;
            renderTable();
        }
    });
    // Add record functionality
    var addRecordForm = document.getElementById('addRecordForm');
    if (!addRecordForm) {
        console.error('Add record form not found');
        return;
    }
    addRecordForm.addEventListener('submit', function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var nameElement, descriptionElement, name, description, response, newRecord, createdDate, row, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    nameElement = document.getElementById('newName');
                    descriptionElement = document.getElementById('newDescription');
                    if (!nameElement || !descriptionElement) {
                        console.error('Form elements not found.');
                        return [2 /*return*/];
                    }
                    name = nameElement.value;
                    description = descriptionElement.value;
                    console.log('Adding new record:', { name: name, description: description });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch('https://localhost:7112/api/records', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name: name, description: description })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    newRecord = _a.sent();
                    createdDate = new Date(newRecord.createdDate).toLocaleDateString('en-CA');
                    row = document.createElement('tr');
                    row.setAttribute('data-id', newRecord.id);
                    row.innerHTML = "\n                    <td>".concat(newRecord.id, "</td>\n                    <td contenteditable=\"true\" class=\"editable\" data-field=\"name\">").concat(newRecord.name, "</td>\n                    <td contenteditable=\"true\" class=\"editable\" data-field=\"description\">").concat(newRecord.description, "</td>\n                    <td>").concat(createdDate, "</td>\n                    <td>\n                        <button class=\"save-btn btn btn-success\">Save</button>\n                        <button class=\"delete-btn btn btn-danger\">Delete</button>\n                    </td>\n                ");
                    table.querySelector('tbody').appendChild(row);
                    records = Array.from(table.querySelectorAll('tbody tr'));
                    renderTable();
                    return [3 /*break*/, 5];
                case 4:
                    console.error('Failed to add new record:', response.statusText);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error adding new record:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
    // Edit and delete functionality
    table.addEventListener('click', function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var target, row, id, nameElement, descriptionElement, name_1, description, response, error_2, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    target = e.target;
                    row = target.closest('tr');
                    if (!row) {
                        console.error('Row not found');
                        return [2 /*return*/];
                    }
                    id = row.getAttribute('data-id');
                    if (!id) {
                        console.error('ID not found');
                        return [2 /*return*/];
                    }
                    if (!target.classList.contains('save-btn')) return [3 /*break*/, 4];
                    nameElement = row.querySelector('[data-field="name"]');
                    descriptionElement = row.querySelector('[data-field="description"]');
                    if (!nameElement || !descriptionElement) {
                        console.error('Form elements not found.');
                        return [2 /*return*/];
                    }
                    name_1 = nameElement.innerText;
                    description = descriptionElement.innerText;
                    console.log('Saving record:', { id: id, name: name_1, description: description });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("https://localhost:7112/api/records/".concat(id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: id, name: name_1, description: description })
                        })];
                case 2:
                    response = _a.sent();
                    if (response.ok) {
                        alert('Record updated successfully');
                    }
                    else {
                        alert('Failed to update record');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error updating record:', error_2);
                    return [3 /*break*/, 4];
                case 4:
                    if (!target.classList.contains('delete-btn')) return [3 /*break*/, 8];
                    console.log('Deleting record:', id);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, fetch("https://localhost:7112/api/records/".concat(id), {
                            method: 'DELETE'
                        })];
                case 6:
                    response = _a.sent();
                    if (response.ok) {
                        row.remove();
                        records = Array.from(table.querySelectorAll('tbody tr'));
                        renderTable();
                    }
                    else {
                        alert('Failed to delete record');
                    }
                    return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.error('Error deleting record:', error_3);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    renderTable();
});
