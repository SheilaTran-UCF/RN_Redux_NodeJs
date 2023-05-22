import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login as loginApi} from '../api/auth-api';
import {getWorks, createWork, deleteWork, updateWork} from '../api/work-api';

const initialState = {
  state_redux: 'react-redux',
  userId: null,
  works: [],
};

export const loginAsyncThunk = createAsyncThunk('auth/login', async data => {
  //loginApi : la dat lai ten, neu ko dat lai ten thi goi thang nhu line 20
  const responseLogin = await loginApi(data);

  return responseLogin;
});

export const getWorkAsyncThunk = createAsyncThunk('auth/getWork', async () => {
  const responseWork = await getWorks();
  // console.log(responseWork);
  return responseWork;
});

export const createWorkAsyncThunk = createAsyncThunk(
  'auth/createWork',
  async data => {
    // responseWork trong scoope khac , dat ten giong cung duoc
    const responseWork = await createWork(data);
    // console.log(responseWork);
    return responseWork;
  },
);

export const deleteWorkAsyncThunk = createAsyncThunk(
  'auth/deleteWork',
  async data => {
    const responseWork = await deleteWork(data);
    // console.log(responseWork);
    return responseWork;
  },
);

export const updateWorkAsyncThunk = createAsyncThunk(
  'auth/updateWork',
  async data => {
    const responseUpdateWork = await updateWork(data);
    return responseUpdateWork;
  },
);

const authSlice = createSlice({
  name: 'AUTH_SLICE',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.state_redux = action.payload;
      // console.log({action});
    },
    resetAuth: (state, action) => {
      Object.assign(state, initialState);
    },
  },
  // login,js
  // extraReducers la ham cua reducers , no support minh khi minh su dung API createAsynThunk
  // moi lan createAsynThunk duoc goi, buider se add vao 3 case o duoi
  extraReducers: builder => {
    builder.addCase(loginAsyncThunk.pending, (state, action) => {});
    builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
      //action.payload?.userId; la data minh truyen vao man hinh login
      state.userId = action.payload?.userId;
    });
    builder.addCase(loginAsyncThunk.rejected, (state, action) => {});

    //getWorkAsyncThunk reducers
    builder.addCase(getWorkAsyncThunk.pending, (state, action) => {});
    builder.addCase(getWorkAsyncThunk.fulfilled, (state, action) => {
      state.works = action.payload?.data;
      // console.log(action.payload);
    });
    builder.addCase(getWorkAsyncThunk.rejected, (state, action) => {});

    //createWorkAsyncThunk
    builder.addCase(createWorkAsyncThunk.pending, (state, action) => {});
    builder.addCase(createWorkAsyncThunk.fulfilled, (state, action) => {
      // state.works = [...state.works, action.payload?.data];
      state.works = [action.payload.data, ...state.works];

      // console.log(action.payload);
    });
    builder.addCase(createWorkAsyncThunk.rejected, (state, action) => {});

    //deleteWorkAsyncThunk
    builder.addCase(deleteWorkAsyncThunk.pending, (state, action) => {});
    builder.addCase(deleteWorkAsyncThunk.fulfilled, (state, action) => {
      const oldWork = [...state.works];
      const filteredWork = oldWork.filter(
        item => item._id !== action.payload.data,
      );

      state.works = filteredWork;
    });
    builder.addCase(deleteWorkAsyncThunk.rejected, (state, action) => {});

    //UpdateWorkAsyncThunk reducers
    builder.addCase(updateWorkAsyncThunk.pending, (state, action) => {});
    builder.addCase(updateWorkAsyncThunk.fulfilled, (state, action) => {
      const oldWorks = [...state.works];
      const filterWorks = oldWorks.filter(
        item => item._id !== action.payload.data._id,
      );
      state.works = [action.payload.data, ...filterWorks];
    });
  },
});

const {reducer, actions} = authSlice;

export const {changeState, resetAuth} = actions;

export default reducer;
