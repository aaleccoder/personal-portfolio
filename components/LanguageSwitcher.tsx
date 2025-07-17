// components/LanguageSwitcher.tsx
'use client';
import {usePathname, useRouter} from "@/i18n/navigation";
import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations, useLocale } from 'next-intl';

const locales = ['en', 'es'];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.push(pathname, { locale: newLocale });
    });
  };
  
  return (
    <div>
      <Select value={locale} onValueChange={handleLocaleChange}>
        <SelectTrigger className='bg-muted'>
          <SelectValue placeholder={locale.toUpperCase()} />
        </SelectTrigger>
        <SelectContent className="z-[9999]">
          <SelectGroup>
            <SelectLabel>{t('language')}</SelectLabel>
            {locales.map((localeOption) => (
              <SelectItem
                key={localeOption}
                value={localeOption}
              >
                {localeOption.toUpperCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
