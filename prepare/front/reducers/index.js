const initialState = {
    name: 'hyunju',
    age: 25,
    password: 'hyun1111'
}
// 위에같은 초기값 state 를 바꾸고 싶으면 action을 만들어서 밑에 데이터 값으로 바꿔준다.

// 데이터는 매번 새로 생성해줄 수 없으니까 data를 받아서 동적으로 계속 바꿔준다.(= action creator)
const changeNickname = (data) => {
    return {
        type: 'CHANGE_NICKNAME',
        data,
    }
};
changeNickname('hyunjulee');
/*
    {
        type: 'CHANGE_NICKNAME',
        data: 'hyunjulee' <= (저 괄호안에 들어있는 값과 동일)
    }
*/
store.dispatch(changeNickname('leehyunju'));

/*
    이렇게 dispatch 하면 어떤 액션이든지 그 자리에서 바로 즉흥적으로 만들어줘서 디스패치 해줄 수 있는 것이다.
*/


// (이전상태, 액션) => 다음상태 | 이전상태와 액션을 통해서 다음상태를 만들어 낸다.
const rootReducer = (state = initialState, action ) => {
    switch (action.type) {
        case 'CHANGE_NICKNAME':
            return {
                ...state,
                name: action.data,
            }
      }
};

export default rootReducer;