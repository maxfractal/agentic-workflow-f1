import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { lastRace, season } from '@/data/season'
import { constructorStandings } from '@/lib/standings'
import { renderAt } from '@/test/render'

describe('HomePage', () => {
  it('summarises the last race with its podium', () => {
    renderAt('/')
    const last = lastRace()!
    expect(screen.getByRole('heading', { name: `Last race: ${last.name}` })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'Full results' })).toHaveAttribute('href', `/races/${last.round}`)
  })

  it("shows the constructor leader's points", () => {
    renderAt('/')
    const leader = constructorStandings(season.races)[0]!
    const card = screen.getByLabelText('Constructor leader')
    expect(within(card).getByText(`${leader.points} pts`)).toBeInTheDocument()
  })
})
