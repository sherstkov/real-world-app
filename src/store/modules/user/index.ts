import { ActionContext } from 'vuex';
import Storage from '@/services/storage';

import { SET_USER_INFO, REMOVE_USER_INFO } from './user.mutations.types';
import { UPDATE_USER_INFO, LOGOUT } from './user.actions.types';

import type { User } from '@/services/api';
import { api } from '@/services';

type UserState = typeof state;
type UserActionContext = ActionContext<UserState, any>;

export const userStorage = new Storage<User>('localStorage', 'user');

const state = {
  user: userStorage.get() || null,
};

const getters = {
  isAuthenticated: (state: { user: UserState }) => !!state.user,
  user: (state: { user: UserState }) => state.user,
};

const mutations = {
  [SET_USER_INFO](state: UserState, user: User) {
    state.user = user;
    api.setSecurityData(user.token);
    userStorage.set(user);
  },
  [REMOVE_USER_INFO](state: UserState) {
    state.user = null;
    api.setSecurityData(null);
    userStorage.remove();
  },
};

const actions = {
  [UPDATE_USER_INFO]({ commit }: UserActionContext, user: User) {
    commit(SET_USER_INFO, user);
  },

  [LOGOUT]({ commit }: UserActionContext) {
    commit(REMOVE_USER_INFO);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
