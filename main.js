$(function(){

	//
	//Game launch annimations
	//
	
	$('#header').animate({left:'0'},500);
	setTimeout(function(){
		$('#slider').animate({top:'140px'},500);
		$('#rules').animate({bottom:''},500);
		setTimeout(function(){
			$('.container-fluid').css('overflow','visible');
		},1000);
	},500);

	//
	// Variables section
	//

	var points={}
	var playerNames=[];
	var count=0; //Player count
	var i=0; //Throw count
	var r=0; //Round count

	//
	// Function section
	//

	function rollAttempts(input, input2){

		if(i%2==0 || (points[input][18]==10 && i==19)){
			points[input][i]=Math.floor(Math.random()*11);
		}else if(points[input][i-1]==10){
			points[input][i]='';										
		}else{
			points[input][i]=Math.floor(Math.random()*(11-points[input][i-1]));
		}

		if(points[input][18]+points[input][19]<10){
			points[input][20]='';
		}

		//Comment section
		//Strike before 19th round
		if(points['throw'+count][i]==10 && i%2==0 && i<19){
			$('#commentSpan').html('Strike! '+input2+' has knocked '+points[input][i]+' pins!');
		//Spare before 20th round	
		}else if(points['throw'+count][i-1]+points['throw'+count][i]==10 && i%2!=0 ){
			if(i==19 && points['throw'+count][i-1]==10){
				$('#commentSpan').html(input2+' hasn\'t knocked any pins!');
			}else if(points['throw'+count][i]==1){
				$('#commentSpan').html('Spare! '+input2+' has knocked '+points[input][i]+' pin!');
			}else{
				$('#commentSpan').html('Spare! '+input2+' has knocked '+points[input][i]+' pins!');
			}
		//Strike in 19th round
		}else if(i==19 && points['throw'+count][i]==10){
			$('#commentSpan').html('Strike! '+input2+' has knocked '+points[input][i]+' pins!');
		//Spare in 20th round
		}else if(i==20 && points['throw'+count][i]!=0 && points['throw'+count][i-1]+points['throw'+count][i]==10 && points['throw'+count][i-2]==10){
			if(points['throw'+count][i]==1){
				$('#commentSpan').html('Spare! '+input2+' has knocked '+points[input][i]+' pin!');
			}else{
				$('#commentSpan').html('Spare! '+input2+' has knocked '+points[input][i]+' pins!');
			}
		//Strike in 20th round
		}else if(points['throw'+count][i]==10 && i==20){
			$('#commentSpan').html('Strike! '+input2+' has knocked '+points[input][i]+' pins!');
		//Zero points
		}else if(points['throw'+count][i]==0){
			$('#commentSpan').html(input2+' hasn\'t knocked any pins!');
		//Open frame
		}else{
			if(points['throw'+count][i]==1){
				$('#commentSpan').html(input2+' has knocked '+points[input][i]+' pin!');
			}else{
				$('#commentSpan').html(input2+' has knocked '+points[input][i]+' pins!');
			}
		}

	}

	function roundPoints(){

		if(i%2!=0){
			points['round'+count][r]=points['throw'+count][i-1]+points['throw'+count][i];
		}

		(function totalPoints(){

			//Strike
			if(points['throw'+count][i-3]==10 && i%2!=0 && (points['throw'+count][i-1]!=10 || i==19) && i<20){
				points['total'+count]+=points['round'+count][r]+10;
				$('#r'+(r-1)+'_'+count).html(points['total'+count]);
			}
			//Double strike
			if(points['throw'+count][i-4]==10 && points['throw'+count][i-2]==10 && i%2==0 && i<20){
				points['total'+count]+=points['throw'+count][i]+20;
				$('#r'+(r-2)+'_'+count).html(points['total'+count]);
			}
			//Spare
			if(points['throw'+count][i-2]+points['throw'+count][i-1]==10 && points['throw'+count][i-2]!=10 && i%2==0 && i<20){
				points['total'+count]+=points['throw'+count][i]+10;
				$('#r'+(r-1)+'_'+count).html(points['total'+count]);
			}
			//Open frame
			if(points['round'+count][r]<10 && i%2!=0 && i<20){
				points['total'+count]+=points['round'+count][r];
				$('#r'+r+'_'+count).html(points['total'+count]);
			}
			//3rd throw in last round
			if(i==20){
				points['total'+count]+=points['round'+count][r]+points['throw'+count][20];
				$('#r'+r+'_'+count).html(points['total'+count]);
			}
		}());
	}

	function game(){

		//Skipping a throw of a player who hit strike in previous round
		for(var j=count;j<playersCount;j++){
			if(points['throw'+j][i-1]==10 && i<18 && i%2!=0 && count<playersCount-1){
				points['throw'+j][i]=0;
				roundPoints();
				count++;
			}else if(points['throw'+j][i-1]==10 && i<18 && i%2!=0 && count==playersCount-1){
				points['throw'+j][i]=0;
				roundPoints();
				count=0;
				i++;
			}else{
				break;
			}
		}

		//Throwing in progress
		rollAttempts('throw'+count, playerNames[count]);

		if(i>0 && i%2==0 && i<20 && count==0){
			r++;
		}

		//Displaying score
		//Strike before 19th round
		if(points['throw'+count][i]==10 && i%2==0 && i<19){
			$('#td'+i+'_'+count).html('X');
			$('#td'+i+'_'+count).addClass('symbolFont');
		//Spare before 20th round	
		}else if(points['throw'+count][i-1]+points['throw'+count][i]==10 && i%2!=0 ){
			if(i==19 && points['throw'+count][i-1]==10){
				$('#td'+i+'_'+count).html('-');
				$('#td'+i+'_'+count).addClass('symbolFont');
			}else{
				$('#td'+i+'_'+count).html('<i>/</i>');
				$('#td'+i+'_'+count).addClass('symbolFont');
			}
		//Strike in 19th round
		}else if(i==19 && points['throw'+count][i]==10){
			$('#td'+i+'_'+count).html('X');
			$('#td'+i+'_'+count).addClass('symbolFont');
		//Spare in 20th round
		}else if(i==20 && points['throw'+count][i]!=0 && points['throw'+count][i-1]+points['throw'+count][i]==10 && points['throw'+count][i-2]==10){
			$('#td'+i+'_'+count).html('<i>/</i>');
			$('#td'+i+'_'+count).addClass('symbolFont');
		//Strike in 20th round
		}else if(points['throw'+count][i]==10 && i==20){
			$('#td'+i+'_'+count).html('X');
			$('#td'+i+'_'+count).addClass('symbolFont');
		//Zero points
		}else if(points['throw'+count][i]==0){
			$('#td'+i+'_'+count).html('-');
			$('#td'+i+'_'+count).addClass('symbolFont');
		//Open frame
		}else{
			$('#td'+i+'_'+count).html(points['throw'+count][i]);
		}

		roundPoints();
		count++;
		
		if(i==19 && count>=playersCount){
			$('#commentDiv').addClass('invisible');
		}

		//Additional throws in 10th round
		if((i==19 && count==playersCount) || i==20){
			i=20;
			count=0;
			for(var j=count;j<playersCount;j++){
				if(points['throw'+j][20]!=undefined){
					count++;
				}else if(points['round'+j][9]>=10){
					$('#commentDiv').removeClass('invisible');
					break;
				}
			}
		}

		//End of 10th round
		if(i==20 && count==playersCount){

			for(var l=0;l<playersCount;l++){
				$('#last_td'+l).html(points['total'+l]);
			}
			$('#commentDiv').removeClass('invisible');
			
			var highestPoints=points['total0'];
			var winner=[playerNames[0]];
			var draw=false;

			for(var k=0;k<playersCount;k++){
				if(points['total'+k]>highestPoints){
					highestPoints=points['total'+k];
					winner=[playerNames[k]];
				}
			}
			for(k=0;k<playersCount;k++){
				if(highestPoints==points['total'+k] && playerNames[k]!=winner[0]){
					draw=true;
					winner.push(playerNames[k]);
				}
			}
			if(draw==true){
				//Creating a span with winners names
				function winnerSpan(){
					var winnerSpan='';
					$(winner).each(function(){
						winnerSpan+=this+', ';
					})
					winnerSpan=winnerSpan.substring(0,winnerSpan.length-2);
					return winnerSpan;
				}
				//Draw among all the players
				if(winner.length==playerNames.length && highestPoints!=1){
					$('#comment').html('The game is finished!<br>We have a draw and all players scored '+highestPoints+' points!');
				}else if(winner.length==playerNames.length && highestPoints==1){
					$('#comment').html('The game is finished!<br>We have a draw and all players scored '+highestPoints+' point!');
				//Draw among not all the players
				}else if(highestPoints!=1){
					$('#comment').html('The game is finished!<br>We have a draw and top scorers are: '+winnerSpan()+' with '+highestPoints+' points!');
				}else if(highestPoints==1){
					$('#comment').html('The game is finished!<br>We have a draw and top scorers are: '+winnerSpan()+' with '+highestPoints+' point!');
				}
			}else if(draw==false){
				if(highestPoints!=1){
					$('#comment').html('The game is finished!<br>'+winner+' wins with '+highestPoints+' points!');
				}else if(highestPoints==1){
					$('#comment').html('The game is finished!<br>'+winner+' wins with '+highestPoints+' point!');
				}
			}

			//New game
			$('#comment').append('<button id="newGameButton">Play again!</button>');
			$('#newGameButton').click(function(){
				location.reload();
			})
		}

		//Next round
		if(count>=playersCount && i<20){
			i++;
			count=0;
		}
	}

	function nameInsertCheck(){

		var namesCheck=[];
		var flag1;
		var flag2=true;

		for(var i=1;i<=playersCount;i++){
			var name=$('#nameInput'+i).val();
			namesCheck.push(name);
		}

		$(namesCheck).each(function(){
			if(this==''){
				flag1=false;
			}else if(flag1!=false){
				flag1=true;
			}
		});

		if(flag1==false){
			alert('Name field can not be empty.')
		}else if(flag1==true){
			for(var j=0;j<namesCheck.length;j++){
				for(var k=j;k<namesCheck.length;k++){
					if(namesCheck[j]==namesCheck[k] && j!=k){
						flag2=false;
						alert('Two players can not have the same name.')
						break;
					}
				}
				if(flag2==false){
					break;
				}
			}
		}
		
		if(flag1==true && flag2==true){
			return true;
		}
	}

	//
	// Execution section
	//

		//Slider action
		var playersCount=$('#myRange').val();
		$('#playersNumber').html(playersCount);
		$('#myRange').change(function(){
			$('#playersNumber').html(this.value);
		});

		//Players number pass
		$('#sliderConfirm').click(function(){

			$('.container-fluid').css('overflow','hidden');
			$('#slider').animate({left:'100%'},500);
			setTimeout(function(){
				$('#slider').addClass('invisible');
				$('#nameInsert').removeClass('invisible');
				$('#nameInsert').animate({top:'140px'},500);
				setTimeout(function(){
					$('.container-fluid').css('overflow','visible');
				},500);
			},500);
			
			playersCount=$('#myRange').val();

			//Creating insert fields for names
			for(var j=0;j<playersCount;j++){
				$('#nameDiv').append((j+1)+':<input type="text" class="nameInput" id="nameInput'+(j+1)+'"><br>');
			}


			//Gathering names into table and displaying score sheet
			$('#nameInsertConfirm').click(function(){
				
				if(nameInsertCheck()){

					for(var j=1;j<=playersCount;j++){
						var name=$('#nameInput'+j).val();
						playerNames.push(name);
					}

					$('.container-fluid').css('overflow','hidden');
					$('#nameInsert').animate({left:'100%'},500);
					setTimeout(function(){
						$('#nameInsert').addClass('invisible');
					},500);
					
					$('#table').removeClass('invisible');
					setTimeout(function(){
						$('#table').animate({left:'0'},500);
						setTimeout(function(){
							$('.container-fluid').css('overflow','visible');
						},500);
					},500);

					//Adding tables for specified number of players
					var tableContent=$('tbody')[0].innerHTML;

					$('tbody').html('');

					for(var j=0;j<playersCount;j++){
						//Adding tables and giving names
						$('tbody')[0].innerHTML+=tableContent;
						$('.playerName').last().html(playerNames[j]);
						//Adding IDs
						for(var k=0;k<22;k++){
							if(k<21){
								$('.td'+k).last().attr('id','td'+(k)+'_'+(j));
							}else if(k==21){
								$('.td'+k).last().attr('id','last_td'+(j));
							}
						}
						for(k=0;k<10;k++){
							$('.r'+k).last().attr('id','r'+(k)+'_'+(j));
						}
						points['total'+j]=0;
						points['throw'+j]=[];
						points['round'+j]=[];
					}

					//Single player
					if(playersCount==1){
						var singlePlayer=true;
						$('tbody')[0].innerHTML+=tableContent;
						$('.playerName').last().html('Computer');
						playerNames.push('Computer');
						points.total1=0;
						points.throw1=[];
						points.round1=[];
						for(var k=0;k<22;k++){
							if(k<21){
								$('.td'+k).last().attr('id','td'+(k)+'_'+(j));
							}else if(k==21){
								$('.td'+k).last().attr('id','last_td'+(j));
							}
						}
						for(k=0;k<10;k++){
							$('.r'+k).last().attr('id','r'+(k)+'_'+(j));
						}
					}

					//Game in progress
					$('#commentDiv').removeClass('invisible');
					
					if(playersCount==1){
						playersCount=2;
					}

					$('#throwButton').click(function(){

						//Player throws
						game();

						//Cpu throws
						if(singlePlayer==true){
							//10th round or no strike from cpu in previous round
							if(i>=18 || points['throw1'][i-1]!=10 || (points['throw1'][i-1]==10 && i%2==0)){

								$('#throwButton').addClass('invisible');
								$('#commentSpan').append('<br>Now it\'s computer\'s turn!');

								setTimeout(function(){
									if(i<20 || points['round1'][9]>=10){
										game();
									}

									//Additional throw of cpu in case of strike of a player and no strike from cpu
									if(i<18 && points['throw0'][i-1]==10 && (points['throw1'][i-1]!=10) && (i-1)%2==0){
										$('#commentSpan').append('<br>Now it\'s computer\'s turn!');
										setTimeout(function(){
											game();
											$('#throwButton').removeClass('invisible');
										},2000);
									}else{
										$('#throwButton').removeClass('invisible');
									}

									//Computer's 20th throw in case of lack of 20th throw of a player
									if(i==20 && points['round0'][9]<10 && points['round1'][9]>=10){
										$('#throwButton').addClass('invisible');
										setTimeout(function(){
											game();
										},2000);
										$('#commentSpan').append('<br>Now it\'s computer\'s turn!');
									}
								},2000);
							}
						}
					});
				}
			});
		});
});