import { TConstructorActions } from "./constructor";
import { TLoginActions } from "./login";
import { TFetchActions, TDetailsActions } from "./menu";
import { TOrderActions } from './order'; 
import { TProfileActions } from "./profile";
import { TUserActions } from "./user";
import { TWsActions } from "./wsActions";
import { TProfileOrdersWsActions } from "./wsProfileActions";

export type TAppActions = 
| TConstructorActions
| TLoginActions
| TFetchActions 
| TDetailsActions
| TOrderActions 
| TProfileActions
| TUserActions
| TWsActions
| TProfileOrdersWsActions