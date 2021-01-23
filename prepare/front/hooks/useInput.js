import { useState, useCallback } from 'react';

export default (initialValue = null ) => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    return [value, handler];
}

/*
state, setState 부분을 이렇게 범용적으로 쓸 수 있도록 바꿔주면 된다.
이 커스텀 훅은 useState와 useCallback을 합친거니까

return [value, handler];
이렇게 setValue부분을 handler로 처리했다.

*/