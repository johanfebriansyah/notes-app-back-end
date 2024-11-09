const { addNoteHandler, getAllNoteHandler, getHanlderById, updateNoteById, deleteNotesById } = require('./handler');

const routes = [
  //menambahkan catata
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  //request untuk menampilkan pesan
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteHandler,
  },
  //method untuk menampilkan pesan ketika pesan yang sudah dibuat di click
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getHanlderById,
  },
  //membuat route untuk mengubah catatan
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNoteById,
  },

  //membuat route untuk menghapus catatan
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNotesById,
  }
];

module.exports = routes;
