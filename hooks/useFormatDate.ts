import { useLocale } from "next-intl";

export function useFormatDate() {
    const locale = useLocale();

    return (date: string | Date | number) =>
        new Date(date).toLocaleString(locale, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
}