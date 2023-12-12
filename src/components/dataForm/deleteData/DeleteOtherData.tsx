import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { deletebyId } from '../../../functions/forAll';

type DeleteOtherDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  accessToken: string | null;
  slug: string;
};

export const DeleteOtherDialog = ({
  isOpen,
  onClose,
  id,
  slug,
  accessToken,
}: DeleteOtherDialogProps) => {
  const handleDelete = async () => {
    try {
      await deletebyId( id, accessToken, slug); 
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle color={'error'}>Delete dialog</DialogTitle>
      <DialogContent>
        <p>Do you really want to delete this <b>{slug}</b>?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={handleDelete} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
