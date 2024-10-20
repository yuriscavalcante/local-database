"use client"
import Grid from '@mui/material/Grid2';
import { Typography } from "@mui/material";
import HeaderNav from "./components/nav";
import ArchiveTable from "./components/archive/archiveTable/ArchiveTable";
import { ArchiveService } from "./api/archive-service";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';

export default function Home() {
  const archiveService = new ArchiveService()
  const [archives, setArchives] = useState<any[]>([])
  const [selectedArchiveId, setSelectedArchiveId] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [videoSrc, setVideoSrc] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const response = await archiveService.list(null)
      setArchives(response)
    }
    init()
  }, [])

  const handleOpenDialog = async (id: number) => {
    const src = archiveService.streamVideo(id)
    setVideoSrc(src)
    setIsOpen(true)
  }

  return (
    <>
      <HeaderNav></HeaderNav>
      <Grid container spacing={6}>
        <Grid size={12} p={3}>
          <ArchiveTable archives={archives} openDialog={(id: any) => handleOpenDialog(id)} />
        </Grid>
      </Grid>
      <Dialog fullWidth open={isOpen} onClose={() => setIsOpen(false)}>
        {videoSrc ?
          <>
            <video controls>
              <source src={videoSrc} type="video/mp4" />
              Seu navegador não suporta o formato de vídeo.
            </video>
          </>
          : null}
      </Dialog>
    </>
  );
}
