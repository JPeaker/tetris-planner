import React from 'react';
import '../style/App.css';
import { Button, Grid, Dialog, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

interface SideBoxProps {}

interface SideBoxState {
  dialogOpen: boolean;
}

class SideBox extends React.Component<SideBoxProps, SideBoxState> {
  constructor(props: SideBoxProps) {
    super(props);

    this.state = {
      dialogOpen: false,
    };
  }

  render() {
    return (
      <Grid container className="side-box">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => this.setState({ dialogOpen: !this.state.dialogOpen })}
        >
          Controls
        </Button>
        <Dialog
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
        >
          <DialogTitle>Shortcuts and controls</DialogTitle>
          <DialogContent>
            Arrow keys can be used to move pieces around while placing them.

            D will drop the piece to the ground. Space will lock it in place if the piece is on the ground, and otherwise will also drop the piece to the ground.
          </DialogContent>
        </Dialog>
      </Grid>
    );
  }
}

export default SideBox;
