const { nanoid } = require('nanoid');
const notes = require('./notes');


const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;

};

const getAllNoteHandler = () => ({
  status: 'Success',
  data: {
    notes,
  }
});

const getHanlderById = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      }
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;

};

const updateNoteById = (request, h) => {
  //mendapatkan ID dari catatan
  const { id } = request.params;

  // mendapatkan data data pada catatan
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil di perbarui'
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'Fail',
    message: 'Catatan Gagal diperbarui',
  });

};

const deleteNotesById = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1){
    notes.splice(index, 1);
    const response = h.response({
      status: 'Success',
      message: 'Catatan Berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan Gagal dihapus'
  });
  response.code(404);
  return response;
};


module.exports = {
  addNoteHandler,
  getAllNoteHandler,
  getHanlderById,
  updateNoteById,
  deleteNotesById
};