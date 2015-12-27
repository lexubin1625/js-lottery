/**
 * 抽奖方法
 * 
 * @author  xubin
 * @date    2015-12-27
 * @email  xubin1625@sina.com.cn
 */
var LOTTERYINDEX = 6, //抽奖索引
    LOTTERYSWITCH = false,//抽奖开关
    ISLOTTERY     = false;      
    LOTTERYTIMES  = 3, 
    LOTTERYDATA   = {};
// 抽奖部分
var lottery={
	index:-1,	//当前转动到哪个位置，起点位置
	count:0,	//总共有多少个位置
	timer:0,	//setTimeout的ID，用clearTimeout清除
	speed:20,	//初始转动速度
	times:0,	//转动次数
	cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize:-1,	//中奖位置
	init:function(id){
            $lottery = document.querySelector('#'+id);
                        $units = document.querySelector('.lottery-unit');
			this.obj = $lottery;
			this.count = $units.length;
                        if(this.index < 0){
                            this.index =1;
                        }else{
                            document.querySelector('.draw-'+this.index).classList.add('act');
                        }
	},
	roll:function(){
		var index = this.index;
		var count = 8;//this.count;
		var lottery = this.obj;
                var classIndex = index+1;
                
                document.querySelector('.draw-'+index).classList.remove('act');
                
		index += 1;
		if (index>count) {
			index = 1;
		};
                document.querySelector('.draw-'+index).classList.add('act');
		this.index=index;
		return false;
	},
	stop:function(index){
		this.prize=index;
		return false;
	},
	doLottory:function(){
        LOTTERYINDEX = this.lotteryIndex(2);
        ISLOTTERY = false;
        
        // 进行抽奖
        lottery.speed=100;
        roll();
        LOTTERYSWITCH = true;
        LOTTERYTIMES--;

	},
	lotteryIndex:function(id){// 获取抽奖位置索引
	    var canLotteryArr = [1,3,7,5],
	    noCanLotteryArr = [2,4,6,8],
	    arr = {};
	    if(id == 1){
	        arr = canLotteryArr;
	    }else{
	        arr = noCanLotteryArr;
	    }
	    var index = Math.floor((Math.random()*arr.length)); 
	    return arr[index];
	},
	showLotteryResult:function(){
	    if(ISLOTTERY){
	        this.haveLottery();
	    }else{
	        this.noneLottery();
	    }
	},
    noTimes:function(){// 没有次数
    	console.log('没有次数');
        return false;
    },
    haveLottery:function(data){ //领取奖品
    	console.log('中奖');
		return false;
    },
    noneLottery:function(data){// 未中奖
        console.log('未中奖');
    	return false;
    }
};
// 抽奖控制
function roll(){

	lottery.times += 1;
	lottery.roll();
	if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
		clearTimeout(lottery.timer);
		lottery.prize=-1;
		lottery.times=0;
        lottery.showLotteryResult();
	}else{
		if (lottery.times<lottery.cycle) {
			lottery.speed -= 10;
		}else if(lottery.times==lottery.cycle) {
			var index = LOTTERYINDEX ;//Math.random()*(lottery.count)|0;
			lottery.prize = index;		
		}else{
			if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
				lottery.speed += 110;
			}else{
				lottery.speed += 20;
			}
		}
		if (lottery.speed<40) {
			lottery.speed=40;
		};
		lottery.timer = setTimeout(roll,lottery.speed);
	}
	return false;
}

// 启动抽奖
var startLottery = function(){
    lottery.init('lottery');
     if(LOTTERYTIMES < 4){
     	lottery.doLottory();
        return false;
    }
    if(!LOTTERYTIMES){
        lottery.noTimes();
        return false;
    }
}
