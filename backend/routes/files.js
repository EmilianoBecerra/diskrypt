import { Router } from "express";
import { deleteAll, deleteOneFile, getAllFile, getByIdFile, insertFile } from "../db/files.js";

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
    res.status(200).json({
      ok: true,
      msg:"Archivo enviado correctamente",
      data: file,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message,
      error: "Falló el servidor"
    });
  }
})

router.delete("/file/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        ok: false,
        error: "Error al obtener el id"
      });
    }
    const file = getByIdFile(id);
    if (!file) {
      return res.status(404).json({
        ok: false,
        error: "Archivo no encontrado"
      });
    }
    deleteOneFile(id);
    res.status(200).json({
      ok: true,
      msg: "Archivo eliminado"
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
      msg: "Falló servidor"
    })
  }
})


router.post("/saveFile", async (req, res) => {
  try {
    const allowTypes = ["image/png", "image/jpeg", "application/pdf", "text/plain"];
    const { name, file, type } = req.body;
    if (!name || !file || !type) {
      return res.status(400).json({
        ok: false,
        error: "Error al obtener los datos del archivo"
      })
    };
    if (name.length > 50) {
      return res.status(400).json({ ok: false, error: "Nombre demasiado largo" });
    }
    if (!allowTypes.includes(type)) {
      return res.status(400).json({ ok: false, error: "Tipo de dato no permitido" });
    }
    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    if (!base64Regex.test(file)) {
      return res.status(400).json({ ok: false, error: "Datos inválidos" });
    }
    const id = insertFile(name, file, type);
    if (!id) throw new Error("Error al guardar el archivo en la DB");
    res.status(200).json({ ok: true, msg: "Archivo guardado correctamente", data: id });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: error.message, error: "Falló el servidor" });
  }
})

router.delete("/files/:pass", (req, res) => {
  const { pass } = req.params;
  if(pass === "borrar"){
    deleteAll();
    res.status(200).json({ok: true, msg:"todos los archivos fueron borrados"})
  }
  res.status(500).send("error al borrar los archivos");
})

export default router;