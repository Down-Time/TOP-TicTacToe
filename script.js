
var GameController=(function(){
    //variable to track turn
    let turn='x';
    let _winner=undefined;

    //cache the DOM
    let $board = document.querySelector('.board');
    let $clear = document.querySelector('.clear');
    let $squares = document.querySelectorAll('.square');
    let $x=document.getElementById('x');
    let $o=document.getElementById('o')

    //bind events
    $board.addEventListener('click',play);
    $clear.addEventListener('click', reset);

    

    function reset(){
        _winner=undefined
        GameBoard.resetBoard();
        turn='x'
        $x.classList.add('selected')
        $o.classList.remove('selected')
    }

    function play(event){
        
        let square = $squares[event.target.id];
        if (_winner==undefined){            
            if(square.innerText==''){
                

                square.innterText=turn;
                GameBoard.addMove(square.id, turn);
                GameBoard.checkWinner();

                turn=='x' ? turn='o' : turn='x';

                if (turn=='x'){
                    $x.classList.add('selected')
                    $o.classList.remove('selected')
                } else{
                    $x.classList.remove('selected')
                    $o.classList.add('selected')
                }
        
                _winner=GameBoard.checkWinner();
                    
            };
        }
    }

})();


var GameBoard=(function(){
    let _gameboard=[];

    //cache the DOM
    let $squares = document.querySelectorAll('.square');
    let $announce=document.querySelector('.results');

    //think good, not tested
    function resetBoard(){

        _gameboard=[]; 
        for (let i = 0; i < 9; i++) {
            $squares[i].innerText='';
          }
             
    }

    //think this is good, but not tested
    function render(){
        _gameboard.forEach((item, index, arr) => {
            $squares[index].innerText=item;
          });
    }

    function addMove(position, symbol){
        
        _gameboard[position]=symbol;
        render();
                
    };
    //this this is good, but not tested
    function checkWinner(){
        let winner=undefined;
    
        //check rows
        for (let i=0;i<3; i++){
   
            if ((typeof(_gameboard[i*3])!=='undefined' && _gameboard[i*3]==_gameboard[i*3+1]  && _gameboard[i*3+1]==_gameboard[i*3+2]) ||
            (typeof(_gameboard[i])!=='undefined' && _gameboard[i]==_gameboard[i+3]  && _gameboard[i+3]==_gameboard[i+6])){
                winner=_gameboard[i*4];
                break;      
            }
        }
    
        if (typeof(winner)=='undefined'){
    
            if ((typeof(_gameboard[0])!=='undefined' && _gameboard[0]==_gameboard[4]  && _gameboard[4]==_gameboard[8]) ||
            (typeof(_gameboard[2])!=='undefined' && _gameboard[6]==_gameboard[4]  && _gameboard[4]==_gameboard[2])){
                // console.log('cross fired')
                winner=_gameboard[4];        
            }
        }
    
        if (_gameboard.includes(undefined)==false && typeof(winner)=='undefined' && _gameboard.length==9){
            winner= 'tie';
        }
        
        if (typeof(winner)!=='undefined'){

            winner!=='tie' ? $announce.innerText=`Winner is ${winner}` : $announce.innerText=`TIE!`;
        }
            
        return winner;
    }

    return{
        resetBoard, checkWinner, addMove
    };
})();



