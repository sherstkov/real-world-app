import { api } from '@/services';
import { userStorage } from '@/store/modules/user';

export default function (): void {
  const token = userStorage.get()?.token;
  if (token !== undefined) api.setSecurityData(token);
}
