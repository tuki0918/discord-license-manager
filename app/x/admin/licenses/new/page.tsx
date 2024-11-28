import LicenseForm from "@/components/LicenseForm";
import { Link } from "@/utils/i18n/routing";
import { generateLicenseKey } from "@/utils/keygen";
import { Key } from "lucide-react";

export default async function Page() {
	return (
		<div className="container mx-auto">
			<div className="h-screen flex items-center justify-center">
				<div>
					<div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex justify-center">
							<Link href={"/x/admin/licenses"}>
								<Key color="#333333" size={48} />
							</Link>
						</h1>
					</div>
					<div>
						<LicenseForm
							defaultValues={{
								code: generateLicenseKey(),
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
