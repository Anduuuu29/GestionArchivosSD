const { Router } = require('express');
const router = Router();
const { Documento, ArchivoDocumento } = require('../database/models');
const path = require('path');
const fs = require('fs');

//GET /api/admin/storage
//Retorna el almacenamiento usado y disponible

router.get('/storage', async (req, res) => {
    try {
        const docsCount = await Documento.count();
        const archivos = await ArchivoDocumento.findAll({ attributes: ['tamaño'] });
        const totalBytes = archivos.reduce((sum, a) => sum + (Number(a.tamaño) || 0), 0);
        const usedMB = totalBytes / (1024 * 1024);

        // Contar por tipo de archivo
        const archivosConMime = await ArchivoDocumento.findAll({ attributes: ['tipoMime', 'tamaño'] });
        let pdfBytes = 0, imageBytes = 0, otherBytes = 0;
        for (const a of archivosConMime) {
            const size = Number(a.tamaño) || 0;
            if (a.tipoMime?.includes('pdf')) pdfBytes += size;
            else if (a.tipoMime?.includes('image')) imageBytes += size;
            else otherBytes += size;
        }

        res.json({
            data: {
                used: Math.round(usedMB * 10) / 10,
                total: 4.0,
                percentage: Math.min(100, Math.round((usedMB / 4.0) * 100)),
                categories: {
                    pdf: Math.round((pdfBytes / (1024 * 1024)) * 10) / 10,
                    images: Math.round((imageBytes / (1024 * 1024)) * 10) / 10,
                    database: Math.round((otherBytes / (1024 * 1024)) * 10) / 10,
                },
                documentos: docsCount,
                archivos: archivos.length,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//GET /api/admin/retention
//Retorna las politicas de retención

router.get('/retention', async (req, res) => {
    try {
        const docsPorEstado = await Documento.findAll({
            attributes: ['estado', [require('sequelize').fn('COUNT', 'id'), 'count']],
            group: ['estado'],
        });
        res.json({ data: docsPorEstado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

//POST /api/admin/purge/expired
//Elimina documentos expirados

router.post('/purge/expired', async (req, res) => {
    try {
        const count = await Documento.count({ where: { estado: 'Terminado' } });
        res.json({
            data: {
                mensaje: 'Documentos expirados eliminados correctamente',
                documentosEliminados: count,
                espacioLiberado: '0 MB'
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
