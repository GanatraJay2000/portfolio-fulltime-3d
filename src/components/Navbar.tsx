"use client";

import clsx from "clsx";
import React, { useRef, useState } from "react";
import { Content, KeyTextField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import Button from "./Button";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function NameLogo({ name }: { name: KeyTextField }) {
  const minName = name?.split(" ");

  const component = useRef(null);
  const { contextSafe } = useGSAP({ scope: component });

  const mouseEnter = contextSafe(() => {
    gsap.to(".hover", {
      width: "2ch",
      duration: 0.5,
      ease: "power3.inOut",
    });
    gsap.to(".hover2", { width: "6ch", duration: 0.5, ease: "power3.inOut" });
  });

  const mouseLeave = contextSafe(() => {
    gsap.to(".hover", { width: 0, duration: 0.5, ease: "power3.inOut" });
    gsap.to(".hover2", { width: 0, duration: 0.5, ease: "power3.inOut" });
  });

  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-slate-900 flex justify-start grow"
      ref={component}
      onMouseEnter={() => mouseEnter()}
      onMouseLeave={() => mouseLeave()}
    >
      <div>{minName?.[0]?.[0]}</div>
      <div className="w-0 hover overflow-hidden">{minName?.[0]?.slice(1)}</div>
      <div>{minName?.[1]?.[0]}</div>
      <div className="w-0 hover2 overflow-hidden">{minName?.[1]?.slice(1)}</div>
    </Link>
  );
}

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {settings.data.nav_item.map(({ link, label }, index) => {
        return (
          <React.Fragment key={label}>
            <li>
              <PrismicNextLink
                className={clsx(
                  "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900"
                )}
                field={link}
                aria-current={
                  pathname == (asLink(link) as string) ? "page" : undefined
                }
              >
                <span
                  className={clsx(
                    "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                    pathname == (asLink(link) as string)
                      ? "translate-y-6"
                      : "translate-y-8"
                  )}
                />
                <span className="relative">{label}</span>
              </PrismicNextLink>
            </li>
            {index < settings.data.nav_item.length - 1 && (
              <span
                className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                aria-hidden="true"
              >
                /
              </span>
            )}
          </React.Fragment>
        );
      })}
      <li>
        <Button
          linkField={settings.data.cta_link}
          label={settings.data.cta_label}
          className="ml-3"
        />
      </li>
    </div>
  );
}

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:m-4 md:flex-row md:items-center md:rounded-xl">
        <div className="flex items-center justify-between grow">
          <NameLogo name={settings.data.name} />
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="block p-2 text-2xl text-slate-800 md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>
        </div>
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]"
          )}
        >
          <button
            aria-label="Close menu"
            aria-expanded={open}
            className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden "
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
          {settings.data.nav_item.map(({ link, label }, index) => (
            <React.Fragment key={label}>
              <li className="first:mt-8">
                <PrismicNextLink
                  className={clsx(
                    "group relative block overflow-hidden rounded px-3  font-bold text-slate-900 "
                  )}
                  field={link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname == (asLink(link) as string) ? "page" : undefined
                  }
                >
                  <span
                    className={clsx(
                      "absolute inset-0 z-0 h-full translate-y-12 rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                      pathname == (asLink(link) as string)
                        ? "translate-y-18 md:translate-y-6"
                        : "translate-y-24 md:translate-y-18"
                    )}
                  />
                  <span className="relative text-6xl leading-[1.2]">
                    {label}
                  </span>
                </PrismicNextLink>
              </li>
              {index < settings.data.nav_item.length - 1 && (
                <span
                  className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
          <li>
            <Button
              linkField={settings.data.cta_link}
              label={settings.data.cta_label}
              className="ml-3"
            />
          </li>
        </div>
        <DesktopMenu settings={settings} pathname={pathname} />
      </ul>
    </nav>
  );
}
