import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { season } from '@/data/season'
import { driverStandings } from '@/lib/standings'
import { renderAt } from '@/test/render'

describe('DriverStandingsPage', () => {
  it('ranks every driver in the season', () => {
    renderAt('/standings/drivers')
    expect(screen.getByRole('heading', { name: 'Driver standings' })).toBeInTheDocument()
    const rows = within(screen.getByRole('table')).getAllByRole('row')
    expect(rows).toHaveLength(driverStandings(season.races).length + 1)
  })

  it('shows the champion first with points, wins and team', () => {
    renderAt('/standings/drivers')
    const [, first] = within(screen.getByRole('table')).getAllByRole('row')
    const cells = within(first!).getAllByRole('cell')
    expect(cells.map((c) => c.textContent)).toEqual(['1', 'Lando Norris', 'McLaren', '7', '423'])
  })
})
