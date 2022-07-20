import { PropertyInformationEnd } from '../../endpoints';
import { LandInformation } from '../../entities/LandInformation';
import { httpGet } from './base';

export async function getLandInformation(tdno: string) {
  return await httpGet<LandInformation>(
    PropertyInformationEnd.GetLandInformation +
      '?tdno=' +
      encodeURIComponent(tdno)
  );
}
