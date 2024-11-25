import LicenseForm from "@/components/LicenseForm";
import { generateLicenseKey } from "@/utils/keygen";

export default async function Page() {
	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<LicenseForm
					defaultValues={{
						code: generateLicenseKey(),
					}}
				/>
			</div>
		</div>
	);
}
