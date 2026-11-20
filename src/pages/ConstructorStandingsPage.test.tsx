import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { season } from '@/data/season'
import { constructorStandings } from '@/lib/standings'
import { renderAt } from '@/test/render'

describe('ConstructorStandingsPage', () => {
  it('ranks every constructor in the season', () => {
    renderAt('/standings/constructors')
    expect(screen.getByRole('heading', { name: 'Constructor standings' })).toBeInTheDocument()
    const rows = within(screen.getByRole('table')).getAllByRole('row')
    expect(rows).toHaveLength(constructorStandings(season.races).length + 1)
  })

  it('shows the leader first with its points', () => {
    renderAt('/standings/constructors')
    const [, first] = within(screen.getByRole('table')).getAllByRole('row')
    const cells = within(first!).getAllByRole('cell')
    const leader = constructorStandings(season.races)[0]!
    expect(cells.map((c) => c.textContent)).toEqual(['1', 'McLaren', String(leader.wins), String(leader.points)])
  })
})
