import { useGet } from '~/composables/useAxios'
import { AxiosResponse } from 'axios'
import { warningMsg } from '~/composables/utils/toastification'
import { CreateAxios } from '~/utils/axios'

export const getUploadPictureBase64AndAudit = async (url: string, msg?: string) => {
  const response = await CreateAxios(url, 'post', {
    responseType: 'arraybuffer',
    headers: {},
  })
  if (response.status == 403) {
    warningMsg(msg || '图片违规')
    return null
  } else {
    return (
      'data:image/png;base64,' +
      btoa(
        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    )
  }
}
