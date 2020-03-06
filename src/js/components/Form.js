import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Button , Paper} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    minHeight: '85vh',
      padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  rootForm: {
    textAlign: 'center',
       '& > *': {
      margin: theme.spacing(1),
      width: 150,
      height: 150
    },
  },
  text: {
        backgroundColor: "white",
  },
  button: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    fontSize: 64,
    height: "100"},
   gameOverButton: { "&:hover": {
        //you want this to be the same as the backgroundColor above
        backgroundColor: "white",cursor: 'not-allowed' }, backgroundColor: 'white'},
   normalButton: { backgroundColor: 'white'},
   winButton: { backgroundColor: "#81c784","&:hover": {
        //you want this to be the same as the backgroundColor above
        backgroundColor: "#81c784",cursor: 'not-allowed'
    }},
    retryButton: { textAlign: 'center' }
});

const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

class Form extends Component {
	constructor(props){
		super(props);
		this.state = {
            player1Moves: [],
            player2Moves: [],
            moveBox: ["","","","","","","",""],
            winner: null,
            winnerBoxes: [],
            playerState: "X" /* player 1 or player 2 */
		};
	}
    
    async restartClear(){
     localStorage.clear();
     this.restart();
	}
    async restart(){
        await this.setState({   
            player1Moves: [],
            player2Moves: [],
            moveBox: ["","","","","","","",""],
            winner: null,
            winnerBoxes: [],
            playerState: "X"
            })
         document.body.classList.remove('victoryBack')
         document.body.classList.add('normalBack')
	}

    async handleMoves(playerState,move){
        switch(playerState){
            case "X":
                var playerMove = this.state.player1Moves || [];
                playerMove.push(move);
                this.setState({
                    player1Moves: playerMove,
                    playerState: "O"
				});
                break;
            case "O":
                var playerMove = this.state.player2Moves || [];
                playerMove.push(move);
                this.setState({
                    player2Moves: playerMove,
                    playerState: "X"
				});
                break;
		}
        let moveBox = this.state.moveBox;
        moveBox[move] = playerState;
        await this.setState({ moveBox });
        await this.calculateWinner();
	}

    calculateWinner(){
        for(let item of winningMoves){
            if(item.every(r=> this.state.player1Moves.includes(r))){
                this.setState({ winner: "X", winnerBoxes: item })
                localStorage.setItem('playerXWins',(localStorage.getItem('playerXWins') ? parseInt(localStorage.getItem('playerXWins')) + 1 : 1))
                localStorage.setItem('playerOLoss',(localStorage.getItem('playerOLoss') ? parseInt(localStorage.getItem('playerOLoss')) + 1 : 1))
                document.body.classList.remove('normalBack')
                document.body.classList.add('victoryBack')
                return;
			}
            if(item.every(r=> this.state.player2Moves.includes(r))){
                this.setState({ winner: "O", winnerBoxes: item  }) 
                localStorage.setItem('playerOWins',(localStorage.getItem('playerOWins') ? parseInt(localStorage.getItem('playerOWins')) + 1 : 1))
                localStorage.setItem('playerXLoss',(localStorage.getItem('playerXLoss') ? parseInt(localStorage.getItem('playerXLoss')) + 1 : 1))
                document.body.classList.remove('normalBack')
                document.body.classList.add('victoryBack')
                return;
			}
		}
              if(this.state.player1Moves.length + this.state.player2Moves.length === 9){
               localStorage.setItem('playerXDraw',(localStorage.getItem('playerXDraw') ? parseInt(localStorage.getItem('playerXDraw')) + 1 : 1))
               localStorage.setItem('playerODraw',(localStorage.getItem('playerODraw') ? parseInt(localStorage.getItem('playerODraw')) + 1 : 1))
               this.restart();
		      }
	}

	render(){
    const {classes} = this.props;
    const { playerState, winner } = this.state;
   
    let ticTacToeArray = [0,1,2,3,4,5,6,7,8];
    let test = [0,3,6]

	return (<React.Fragment>
      <div className={classes.root}>
       <ul>
            <div className={'playerXNav'}>
             <h4 style={{margin:0}}>PLAYER X</h4>
            <h4 style={{margin:0}}> Win -   { localStorage.getItem('playerXWins') || 0}</h4>
            <h4 style={{margin:0}}> Loss -  { localStorage.getItem('playerXLoss') || 0}</h4>
            <h4 style={{margin:0}}> Draw -  { localStorage.getItem('playerXDraw') || 0}</h4>
            </div>
            <div className={'title'}>
             TIC TAC TOE
            </div>
            <div className={'playerONav'}>
             <h4 style={{margin:0}}>PLAYER O</h4>
            <h4 style={{margin:0}}> Win -  { localStorage.getItem('playerOWins') || 0}</h4>
            <h4 style={{margin:0}}> Loss -  { localStorage.getItem('playerOLoss') || 0 }</h4>
            <h4 style={{margin:0}}> Draw -  { localStorage.getItem('playerODraw') || 0 }</h4>
            </div>
       </ul>
      <Grid container spacing={2}>
        <Grid item xs={12} >
        {
            [0,3,6].map((record,index) => (
             <form className={classes.rootForm}>
            <Button  id={record} disableRipple={this.state.winner ? true : false } onClick={()=>{ this.state.winner ? false : this.handleMoves(playerState,record)}} 
            className={classes.button + " " + (this.state.winnerBoxes.includes(record) ? classes.winButton:(this.state.winner) ? classes.gameOverButton : classes.normalButton)} size={'large'}>
            {this.state.moveBox[record]}
            </Button>
             <Button  id={record+1}  disableRipple={this.state.winner ? true : false } onClick={()=>{this.state.winner ? false :this.handleMoves(playerState,record+1)}} 
             className={classes.button + " " + (this.state.winnerBoxes.includes(record+1) ? classes.winButton:(this.state.winner) ? classes.gameOverButton : classes.normalButton)} size={'large'}>
            {this.state.moveBox[record+1]}
            </Button>
             <Button  id={record+2}  disableRipple={this.state.winner ? true : false } onClick={()=>{this.state.winner ? false :this.handleMoves(playerState,record+2)}} 
             className={classes.button + " " + (this.state.winnerBoxes.includes(record+2) ? classes.winButton: (this.state.winner) ? classes.gameOverButton : classes.normalButton) } size={'large'}>
            {this.state.moveBox[record+2]}
            </Button>
            </form> 
            ))
		}
        </Grid>
        <Grid item xs={12}>
            <h1 style={{textAlign:'center'}}>{ !winner ? "Player "+playerState+"'s turn" : "Player "+winner+" wins!"}</h1>            
        </Grid>
        {
         winner ?  
         <Grid item xs={12} className={classes.retryButton}>
            <Button
               variant={'outlined'}
               color="primary"
               onClick={()=>this.restart()}
               style={{right:'5%',margin:0}}
             >
               Play Again!
             </Button>
             <Button
               variant={'outlined'}
               color="secondary"
               onClick={()=>this.restartClear()}
               style={{left:'7%',margin:0}}
             >
               Clear Scores!
             </Button>
         </Grid>
         :
         ''
		}
      
      </Grid>
    </div>
    </React.Fragment>
		)
	}
}
const StyledForm =  withStyles(useStyles,{withTheme:true})(Form);
export default StyledForm;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<StyledForm />,wrapper) : false;