

const PostReducer = (state, action)=>{
    switch(action.type){
        case "POST_START":
            return{
                newPost:null,
                postList: state,
                isFetching: true,
                error: false,
            };
        case "POST_SUCCESS":
            return{
                newPost:action.payload,
                postList: {...postList , ...newPost},
                isFetching: false,
                error: false,
            };
        case "POST_FAILURE":
            return{
                postList: null,
                newPost:null,
                isFetching: false,
                error: true,
            };
        default:
            return state;
    }
}


export default PostReducer;