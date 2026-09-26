import { useTranslations } from "next-intl";
import { Copyright } from "lucide-react";
import { Link } from "lucide-react";

export default function AisLicensesPage() {
    const t = useTranslations("AISPages.LicensePage");

    return (
        <div className="mt-10 flex justify-center p-4">
            <div className="w-full max-w-3xl">
                <h1 className="text-2xl font-bold">{t("PageTitle")}</h1>
                <p>{t("PageDescription")}</p>

                <nav className="mt-8 rounded-lg border p-4">
                    <h2 className="mb-3 font-semibold">{t("Contents")}</h2>

                    <ul className="list-inside list-disc space-y-1">
                        <li>
                            <a
                                href="#aisstream"
                                className="text-blue-600 hover:underline"
                            >
                                AISStream
                            </a>
                        </li>
                        <li>
                            <a
                                href="#pelyr"
                                className="text-blue-600 hover:underline"
                            >
                                Pelyr
                            </a>
                        </li>
                        <li>
                            <a
                                href="#fintraffic-digitraffic"
                                className="text-blue-600 hover:underline"
                            >
                                Fintraffic Digitraffic
                            </a>
                        </li>
                    </ul>
                </nav>

                <section id="aisstream" className="mt-10 scroll-mt-20">
                    <h2 className="text-xl font-bold">AISStream</h2>
                    <hr className="mb-3" />
                    <p className="my-3">
                        <Copyright className="mr-2 inline-block" />{" "}
                        {t("AisStream.License")}
                    </p>
                    <p className="my-3">{t("AisStream.Description")}</p>
                    <p className="my-3">
                        <Link className="mr-2 inline-block" /> {t("SourceLink")}
                        :{" "}
                        <a
                            href="https://aisstream.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://aisstream.io/
                        </a>
                    </p>
                </section>

                <section id="pelyr" className="mt-10 scroll-mt-20">
                    <h2 className="text-xl font-bold">Pelyr</h2>
                    <hr className="mb-3" />
                    <p className="my-3">
                        <Copyright className="mr-2 inline-block" />{" "}
                        {t("Pelyr.License")}
                    </p>
                    <p className="my-3">{t("Pelyr.Description")}</p>
                    <p className="my-3">
                        <Link className="mr-2 inline-block" /> {t("SourceLink")}
                        :{" "}
                        <a
                            href="https://pelyr.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://pelyr.com/
                        </a>
                    </p>
                </section>

                <section
                    id="fintraffic-digitraffic"
                    className="mt-10 scroll-mt-20"
                >
                    <h2 className="text-xl font-bold">
                        Fintraffic Digitraffic
                    </h2>
                    <hr className="mb-3" />
                    <p className="my-3">
                        <Copyright className="mr-2 inline-block" />{" "}
                        {t("FintrafficDigitraffic.License")}
                    </p>
                    <p className="my-3">
                        {t("FintrafficDigitraffic.Description")}
                    </p>
                    <p className="my-3">
                        <Link className="mr-2 inline-block" /> {t("SourceLink")}
                        :{" "}
                        <a
                            href="https://digitraffic.fi/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            https://digitraffic.fi/
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
