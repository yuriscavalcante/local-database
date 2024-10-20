"use client"
import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import HeaderNav from '../components/nav';
import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ArchiveService } from '../api/archive-service';

const Upload = () => {
  const archiveService = new ArchiveService()
  const [isLoading, setIsloading] = useState<boolean>(false)

  const archiveSaveFormik = useFormik({
    initialValues: { name: '', file: null },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('O campo é requerido'),
      file: Yup.mixed().required('É necessário selecionar um arquivo'),
    }),
    onSubmit: values => handleSubmit(values)
  })

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    setIsloading(true)
    try {
      formData.append('file', values.file);
      formData.append('name', values.name);
      await archiveService.save(formData)
    } catch (err: any) {
      console.log(err.message)
    }
    setIsloading(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      archiveSaveFormik.setFieldValue('file', file);
      archiveSaveFormik.setFieldValue('name', file.name);
    }
  };

  return (
    <>
      <HeaderNav></HeaderNav>
      <form onSubmit={archiveSaveFormik.handleSubmit}>
        <Grid container spacing={2} p={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              required
              id="name"
              label="Nome"
              disabled
              value={archiveSaveFormik.values.name}
              onChange={(event: any) => {
                archiveSaveFormik.handleChange(event)
              }}
              error={archiveSaveFormik.touched.name && Boolean(archiveSaveFormik.errors.name)}
              helperText={archiveSaveFormik.touched.name && archiveSaveFormik.errors.name}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              required
              id="file"
              onChange={(event: any) => {
                handleFileChange(event)
              }}
              type='file'
            />
            {archiveSaveFormik.touched.file && archiveSaveFormik.errors.file ? (
              <div style={{ color: 'red', marginTop: '8px' }}>{archiveSaveFormik.errors.file}</div>
            ) : null}
          </Grid>
          <Grid>
            <Button disabled={isLoading} variant="contained" color='success' type='submit'>Salvar</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default Upload