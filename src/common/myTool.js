let myTool = {
    getScoreRange(a,b,l){
        // get score select range
        var minScore = a;
        var maxScore = b;
        var level = l;
        var max = null;
        var min = null;
        var numArr = [];
        if(level==0){
            numArr.push(minScore);
            numArr.push(maxScore);
            return numArr;
        }
        // console.log(numArr)
        if(maxScore==minScore){
            numArr=[minScore]
        }else{

            if(maxScore>minScore){
                max = maxScore;
                min = minScore;
            }else{
                max = minScore;
                min = maxScore;
            }
            for(let i = 0; i<=Math.ceil((max-min)/level);i++){
                numArr.push(min+i*level)
            }
            if(max<0&&min<0){
                numArr.reverse();
            }
        }
        return numArr
        // get score select range
    }
}
export  {myTool}