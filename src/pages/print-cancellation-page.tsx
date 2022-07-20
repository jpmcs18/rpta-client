import { useState } from 'react';
import { useSetBusy, useSetMessage } from '../custom-hooks/authorize-provider';
import { LandInformation } from '../entities/LandInformation';
import SeachBar from './components/seachbar';
import { getLandInformation } from './processors/property-information-process';

export default function PrintCancellationPage() {
  const [landInformation, setLandInformation] = useState<
    LandInformation | undefined
  >();
  const setBusy = useSetBusy();
  const setMessage = useSetMessage();
  async function search(tdno: string) {
    setBusy(true);
    await getLandInformation(tdno)
      .then((res) => {
        if (!!res) {
          setLandInformation(() => res);
        }
      })
      .catch((err) => {
        setMessage({ message: err.message });
      })
      .finally(() => setBusy(false));
  }
  return (
    <>
      <section>
        <SeachBar placeholder='Tax Declaration No.' search={search} />
      </section>
      <section>
        <div className='land-cancellation'>
          <div className='td-no'>{landInformation?.taxDeclarationNo}</div>
          <div className='owner'>
            <div className='name'>{landInformation?.owner}</div>
            <div className='address'>{landInformation?.address}</div>
          </div>
          <div className='admin'>
            <div className='name'>{landInformation?.admin}</div>
            <div className='address'>{landInformation?.adminAddress}</div>
          </div>
          <div className='location'>{landInformation?.locationOfProperty}</div>
          <div className='certification'>
            <div className='title-no'>
              {landInformation?.certificationOfTitleNo}
            </div>
            <div className='cadastral-lot'>
              {landInformation?.cadastralLotNo}
            </div>
            <div className='assessors-lot'>
              {landInformation?.assessorsLotNo}
            </div>
          </div>
          <div className='block'>{landInformation?.blockNo}</div>
          <div className='bounderies'>
            <div className='north'>{landInformation?.northBoundary}</div>
            <div className='south'>{landInformation?.southBoundary}</div>
            <div className='east'>{landInformation?.eastBoundary}</div>
            <div className='west'>{landInformation?.westBoundary}</div>
          </div>
          <div className='cancellation'>
            {landInformation?.cancellationRemarks?.map((e) => (
              <div className='remarks' key={e.tdNo}>
                {e.tdNo}-{e.owner}
                {e.registrationDateFiltered &&
                  `-${new Date(e.registrationDateFiltered).toLocaleString()}`}
              </div>
            ))}
          </div>
          <div>
            <table>
              {landInformation?.appraisals?.map((e) => (
                <tr key={e.kind}>
                  <td>{e.kind}</td>
                  <td>{e.area.toLocaleString()}</td>
                  <td>{e.unitValue}</td>
                  <td>{!!e.adjustment && <span>{e.adjustment}</span>}</td>
                  <td>
                    {e.marketValue.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}></td>
                <td>
                  {landInformation?.totalAppraisalAmount?.toLocaleString(
                    'en-US',
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
