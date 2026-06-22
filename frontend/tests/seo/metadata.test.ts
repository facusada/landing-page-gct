import { describe, expect, it } from 'vitest'
import { organizationJsonLd, siteConfig } from '../../data/site'

describe('seo configuration', () => {
  it('defines canonical organization data', () => {
    expect(siteConfig.url).toMatch(/^https:\/\//)
    expect(organizationJsonLd['@type']).toBe('Organization')
    expect(organizationJsonLd.name).toBe('Global Core Technologies')
    expect(organizationJsonLd.sameAs.length).toBeGreaterThanOrEqual(3)
  })
})
