import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  CircularProgress,
  Link,
  Box,
  Tooltip,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GlassBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.85)',
  borderRadius: '16px',
  padding: '16px',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const HideScroll = styled(Box)(() => ({
  maxHeight: '60vh',
  overflowY: 'auto',
  paddingRight: '4px',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none', 
  },
}));

const truncateText = (text, maxLength = 40) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export default function UrlHistoryModal({ isOpen, onClose }) {
  const [uris, setUris] = useState([]);
  const [loading, setLoading] = useState(true);

 const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  } catch (err) {
    toast.error('Could not copy.');
    console.error('Copy failed:', err);
  }
};


  useEffect(() => {
    if (!isOpen) return;

    const fetchUris = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user/uris', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setUris(data.uris || []);
      } catch (error) {
        console.error('Error fetching URIs:', error);
        setUris([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUris();
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Fade}
      PaperProps={{
        style: {
          background: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <GlassBox>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            URL history
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 0 }}>
          {loading ? (
            <Box display="flex" flexDirection="column" alignItems="center" py={4}>
              <CircularProgress size={30} />
              <Typography variant="body2" mt={2} color="text.secondary">
                Loading...
              </Typography>
            </Box>
          ) : uris.length === 0 ? (
            <Typography align="center" py={4} color="text.secondary">
             There are no saved URLs
            </Typography>
          ) : (
            <HideScroll display="flex" flexDirection="column" gap={2}>
              {uris.map((uri) => {
                const created = new Date(uri.createdAt);
                const expires = new Date(created.getTime() + 24 * 60 * 60 * 1000);

                return (
                  <Box
                    key={uri._id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255,255,255,0.6)',
                      transition: '0.3s',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.85)' },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" fontWeight={600}>
                        URL:
                      </Typography>
                      <Tooltip title={uri.uri}>
                        <Link
                          href={uri.uri}
                          target="_blank"
                          rel="noopener"
                          underline="hover"
                          color="primary"
                          sx={{ wordBreak: 'break-all' }}
                        >
                          {truncateText(uri.uri, 40)}
                        </Link>
                      </Tooltip>
                      <Tooltip title="Copy the URL">
                        <IconButton size="small" onClick={() => copyToClipboard(uri.uri)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                      <Typography variant="body2" fontWeight={600}>
                        Code:
                      </Typography>
                      <Tooltip title={uri.code}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {truncateText(uri.code, 20)}
                        </Typography>
                      </Tooltip>
                      <Tooltip title="Copy the code">
                        <IconButton size="small" onClick={() => copyToClipboard(uri.code)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                      Created: {created.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Valid until: {expires.toLocaleString()}
                    </Typography>
                  </Box>
                );
              })}
            </HideScroll>
          )}
        </DialogContent>
        
      </GlassBox>
        <ToastContainer position="top-right" autoClose={3000} />
    </Dialog>
  );
}
