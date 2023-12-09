import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { deleteOneBook } from '../../../functions/forBook';

type DeleteDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onRefreshData: () => void; 
    isbn: string;
    accessToken: string | null;
  };
  
 export const DeleteBookDialog = ({
    isOpen,
    onClose,
    onRefreshData,
    isbn,
    accessToken,
  }: DeleteDialogProps) => {
    const handleDelete = async () => {
      try {
        await deleteOneBook(isbn, accessToken);
        onRefreshData(); 
        onClose(); 
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <p>Do you really want to delete this book?</p>
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