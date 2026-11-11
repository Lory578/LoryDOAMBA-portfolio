#!/usr/bin/env python3
"""Vérifie le contraste WCAG de paires de couleurs.

Usage :
    python3 contrast_check.py "#1B1226:#FAF6F1" "#FFFFFF:#D6246E"

Chaque argument est une paire "texte:fond" en hexadécimal (#RGB ou #RRGGBB).
Affiche le ratio et la conformité WCAG AA / AAA pour le texte normal et le grand texte.
Code de sortie : 1 si au moins une paire échoue AA pour le texte normal, sinon 0.
"""
import sys


def parse_hex(value: str):
    value = value.strip().lstrip("#")
    if len(value) == 3:
        value = "".join(c * 2 for c in value)
    if len(value) != 6:
        raise ValueError(f"Couleur invalide : {value!r}")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


def linear(channel: int) -> float:
    c = channel / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def luminance(rgb) -> float:
    r, g, b = (linear(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(fg: str, bg: str) -> float:
    l1, l2 = luminance(parse_hex(fg)), luminance(parse_hex(bg))
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


def mark(ok: bool) -> str:
    return "OK " if ok else "NON"


def main(argv):
    if not argv:
        print(__doc__)
        return 2
    failed = False
    for pair in argv:
        try:
            fg, bg = pair.split(":")
            r = ratio(fg, bg)
        except ValueError as exc:
            print(f"{pair} -> erreur : {exc}")
            failed = True
            continue
        aa_normal, aa_large = r >= 4.5, r >= 3.0
        aaa_normal, aaa_large = r >= 7.0, r >= 4.5
        print(
            f"{fg} sur {bg} : {r:5.2f}:1 | "
            f"AA texte {mark(aa_normal)} | AA grand texte/UI {mark(aa_large)} | "
            f"AAA texte {mark(aaa_normal)} | AAA grand texte {mark(aaa_large)}"
        )
        if not aa_normal:
            failed = True
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
