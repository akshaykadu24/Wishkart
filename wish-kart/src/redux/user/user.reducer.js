import {
  USER_LOADING,
  USER_ERROR,
  USER_LOGIN,
  USER_LOGOUT,
  USER_ADD_TO_CART,
  USER_DELETE_FROM_CART,
  USER_ADD_NEW_ADDRESS,
  USER_ORDER,
  ADMIN_LOGIN,
  ADMIN_ERROR
} from "./user.type";
const initialState = {
  loading: false,
  error: false,
  isAuth: false,
  user: {
    id: "",
    mobile_no: "",
    name: "",
    address: {},
    cart: [],
    order: [],
  },
};

const UserReducer = (state = initialState, { type, payload }) => {
  console.log("UserReducer", "type:", type, "payload:", payload);

  switch (type) {
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_LOGIN: {
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: payload,
      };
    }
    case ADMIN_LOGIN: {
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: payload,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: {
          id: "",
          mobile_no: "",
          name: "",
          address: {},
          cart: [],
          order: [],
        },
      };
    }

    case USER_ADD_TO_CART: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          cart: payload,
        },
      };
    }
    case USER_DELETE_FROM_CART: {
      return {
        ...state,
        loading: false,
        user: payload,
      };
    }

    case USER_ADD_NEW_ADDRESS: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          address: payload.address,
        },
      };
    }
    case USER_ORDER: {
      return {
        ...state,
        loading: false,
        user: payload,
      };
    }

    case USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case ADMIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default UserReducer;
