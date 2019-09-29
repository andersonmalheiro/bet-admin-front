import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

export function errorHandler(body: any) {
	if (!isEmpty(body)) {
		const { data, status, statusText } = body;
		if (!isEmpty(data)) {
			if (data.hasOwnProperty('detail')) {
				toast.error(data.detail);
			}
		} else {
			if (status === 401) {
				toast.error('Sem permissão para essa ação.');
			}
		}
	} else {
		toast.error('Ops...');
	}
}
