'use client';

import { useEffect } from 'react';
import { capturarCodigoDeUrl } from '@/lib/referral';

/** Invisible — solo guarda `?ref=CODIGO` de la URL para atribuirlo cuando la
 * persona cree su cuenta (puede pasar varias pantallas después). Montado una
 * vez en el layout raíz, cubre landing/onboarding/paywall/etc. */
export function ReferralCapture() {
  useEffect(() => {
    capturarCodigoDeUrl();
  }, []);
  return null;
}
