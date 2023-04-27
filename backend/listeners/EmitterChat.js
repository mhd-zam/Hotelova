let user = []


module.exports = {
    adduser: (userid,socketid)=>{
        const exists = user.find(user => user.userid === userid)
        if (!exists) {
            user.push({ userid, socketid });
        }
    },
    getReceiver: (receiverid) => {
        let result = user.find(({ userid }) => userid == receiverid)
        return result
    },
    RemoveUser: (socketid) => {
        user = user.filter(user => user.socketid !== socketid)
        console.log(user);
    }
    , user
}