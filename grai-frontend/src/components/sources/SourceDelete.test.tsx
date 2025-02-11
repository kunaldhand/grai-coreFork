import React from "react"
import userEvent from "@testing-library/user-event"
import { GraphQLError } from "graphql"
import { act, render, screen, waitFor } from "testing"
import SourceDelete, { DELETE_SOURCE } from "./SourceDelete"

const source = {
  id: "1",
  name: "Test Source",
}

test("renders", async () => {
  const user = userEvent.setup()

  render(<SourceDelete source={source} onClose={() => {}} />)

  await act(
    async () =>
      await user.click(screen.getByRole("menuitem", { name: /delete/i }))
  )
})

test("delete", async () => {
  const user = userEvent.setup()

  render(<SourceDelete source={source} onClose={() => {}} />)

  await act(
    async () =>
      await user.click(screen.getByRole("menuitem", { name: /delete/i }))
  )

  await act(
    async () =>
      await user.click(screen.getByRole("button", { name: /delete/i }))
  )
})

test("error", async () => {
  const user = userEvent.setup()

  render(<SourceDelete source={source} onClose={() => {}} />, {
    mocks: [
      {
        request: {
          query: DELETE_SOURCE,
          variables: {
            id: source.id,
          },
        },
        result: {
          errors: [new GraphQLError("Error!")],
        },
      },
    ],
  })

  await act(
    async () =>
      await user.click(screen.getByRole("menuitem", { name: /delete/i }))
  )

  await act(
    async () =>
      await user.click(screen.getByRole("button", { name: /delete/i }))
  )

  await waitFor(() => {
    expect(
      screen.getByText("Failed to delete source ApolloError: Error!")
    ).toBeInTheDocument()
  })
})
