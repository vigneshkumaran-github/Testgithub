import {
  AddAddressApi,
  DeleteAddressApi,
  GetAllAddressApi,
  UpdateAddressApi,
} from './Api/AddressApi';
import {BookServiceApi, InstantBookingApi} from './Api/BookServiceApi';
import {BookingHistoryApi, HistoryDetailsApi} from './Api/HistoryApi';
import {
  CreateProfileApiCall,
  ResendOtpCall,
  SendOtpCall,
  VerifyOtpCall,
} from './Api/AuthApi';
import {EditProfileApi, ProfileApiCall} from './Api/ProfileApi';
import {LaunServiceMethodApi, LaundryCategoryApi, LaundryCostApi} from './Api/LaundryApi';
import { MaidCostApi, MaidServiceApi } from './Api/MaidApi';
import {MepCostApi, MepListApi} from './Api/MepApi';
import { PestCostApi, PestServiceApi } from './Api/PestApi';

import {DashBoardApiCall} from './Api/DashBoardApi';
import { GetNotification } from './Api/NotificationApi';
import {OnboardApiCall} from './Api/OnboardApi';

export default {
  OnboardApiCall,
  DashBoardApiCall,
  SendOtpCall,
  VerifyOtpCall,
  ResendOtpCall,
  CreateProfileApiCall,
  ProfileApiCall,
  EditProfileApi,
  MepListApi,
  LaunServiceMethodApi,
  LaundryCategoryApi,
  MaidServiceApi,
  PestServiceApi,
  AddAddressApi,
  GetAllAddressApi,
  UpdateAddressApi,
  DeleteAddressApi,
  BookServiceApi,
  BookingHistoryApi,
  HistoryDetailsApi,
  GetNotification,
  InstantBookingApi,
  PestCostApi,
  LaundryCostApi,
  MepCostApi,
  MaidCostApi
};
