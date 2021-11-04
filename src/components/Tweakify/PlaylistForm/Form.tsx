import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Fade } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CircularProgress from '@mui/material/CircularProgress';
import { red } from '@mui/material/colors';

export const NAME = 'name';
export const DESCRIPTION = 'description';
export interface FormValues {
  [NAME]: string;
  [DESCRIPTION]?: string;
}

const ValidationSchema = Yup.object().shape({
  [NAME]: Yup.string().required('This field is required'),
  [DESCRIPTION]: Yup.string().optional(),
});

const FieldWrapper = styled.div`
  margin-bottom: 15px !important;
`;

const StyledDialogContent = styled(DialogContent)`
  padding-top: 0 !important;
  padding-bottom: 24px !important;
`;

const CenteredDialogContent = styled(StyledDialogContent)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ErrorWrapper = styled.div`
  color: ${red[300]};
`;

interface PlaylistFormProps {
  open: boolean;
  defaultValues: FormValues;
  handleClose: () => void;
  handleSubmit: (formValues: FormValues) => void;
  fetchingPlaylist?: boolean;
  playlistError?: string;
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({
  open,
  defaultValues,
  handleClose,
  handleSubmit,
  fetchingPlaylist,
  playlistError,
}) => {
  return (
    <Dialog
      id="playlist-form"
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      scroll="body"
      PaperProps={{ style: { overflowY: 'unset' } }}
    >
      <Formik
        initialValues={defaultValues}
        enableReinitialize
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formProps) => {
          const {
            isValid,
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleReset,
            setFieldValue,
            setFieldTouched,
          } = formProps;

          const resetDisabled = !dirty || isSubmitting;
          const submitDisabled = !isValid || !dirty || isSubmitting;

          return (
            <>
              <Fade
                in={isSubmitting}
                style={{ transitionDelay: isSubmitting ? '800ms' : '0ms' }}
              >
                <LinearProgress color="primary" />
              </Fade>
              <DialogTitle>Add new playlist</DialogTitle>
              {fetchingPlaylist && (
                <CenteredDialogContent>
                  <CircularProgress size={30} />
                </CenteredDialogContent>
              )}
              {!fetchingPlaylist && playlistError && (
                <StyledDialogContent>
                  <ErrorWrapper>Something went wrong...</ErrorWrapper>
                </StyledDialogContent>
              )}
              {!fetchingPlaylist && !playlistError && (
                <Form>
                  <DialogContent>
                    <FieldWrapper>
                      <TextField
                        id={NAME}
                        name={NAME}
                        label="Playlist name"
                        type="text"
                        value={values[NAME]}
                        onChange={(ev) => setFieldValue(NAME, ev.target.value)}
                        onBlur={() => setFieldTouched(NAME)}
                        error={touched[NAME] && !!errors[NAME]}
                        helperText={(touched[NAME] && errors[NAME]) || ''}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <TextField
                        id={DESCRIPTION}
                        name={DESCRIPTION}
                        label="Playlist description (optional)"
                        type="text"
                        value={values[DESCRIPTION]}
                        onChange={(ev) =>
                          setFieldValue(DESCRIPTION, ev.target.value)
                        }
                        onBlur={() => setFieldTouched(DESCRIPTION)}
                        error={touched[DESCRIPTION] && !!errors[DESCRIPTION]}
                        helperText={
                          (touched[DESCRIPTION] && errors[DESCRIPTION]) || ''
                        }
                        margin="dense"
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </FieldWrapper>
                  </DialogContent>
                  <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onClick={handleReset}
                      disabled={resetDisabled}
                    >
                      Reset
                    </Button>
                    <Button
                      disabled={submitDisabled}
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default PlaylistForm;
