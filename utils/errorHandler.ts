type ToastFunction = (params: { title: string; description: string }) => void;

export const handleError = (error: unknown, toast: ToastFunction) => {
	console.error(error);
	if (error instanceof Error) {
		toast({
			title: "Error",
			description: error.message,
		});
	} else {
		toast({
			title: "Error",
			description: "An error occurred",
		});
	}
};

export const handleErrorWithLoading =
	(
		toast: ToastFunction,
		setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	) =>
	async (
		action: () => Promise<void>,
		callback?: (toast: ToastFunction) => void,
	) => {
		try {
			setLoading(true);
			await action();
			setLoading(false);
			if (callback) {
				callback(toast);
			}
		} catch (error) {
			setLoading(false);
			handleError(error, toast);
		}
	};
