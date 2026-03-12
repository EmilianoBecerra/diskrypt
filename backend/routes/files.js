import { Router } from "express";
import { deleteOneFile, getAllFile, getByIdFile, insertFile } from "../db/files.js";

const router = Router();

router.get("/files", (req, res) => {
  try {
    const files = getAllFile();
    const nombreYId = files.map(f => ({
      id: f.id,
      name: f.filename
    }))
    res.status(200).json({
      ok: true,
      msg: "Archivos enviados",
      data: nombreYId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: error.message, error: "Falló el servidor" });
  }
})

router.get("/files/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        ok: false,
        error: "Error al obtener el id"
      })
    };
    const file = getByIdFile(id);
    if (!file) return res.status(404).json({
      ok: false,
      error: "Archivo no encontrado"
    });
    deleteOneFile(req.params.id);
    res.status(200).json({
      ok: true,
      msg: "Archivo enviado",
      data: file
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
      error: "Falló el servidor"
    });
  }
})

router.post("/saveFile", async (req, res) => {
  try {
    const { name, file, type } = req.body;
    if (!name || !file || !type) {
      return res.status(400).json({
        ok: false,
        error: "Error al obtener los datos del archivo"
      })
    };
    const id = insertFile(name, file, type);
    if (!id) throw new Error("Error al guardar el archivo en la DB");
    res.status(200).json({ ok: true, msg: "Archivo guardado correctamente", data: id });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: error.message, error: "Falló el servidor" });
  }
})

export default router;