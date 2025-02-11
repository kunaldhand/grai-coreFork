import React from "react"
import { render, screen, waitFor } from "testing"
import Chat, { GET_WORKSPACE } from "./Chat"

test("renders", async () => {
  render(<Chat />)

  await waitFor(() => {
    expect(screen.getByText("GrAI Workspace Chat")).toBeInTheDocument()
  })
})

test("not found", async () => {
  const mocks = [
    {
      request: {
        query: GET_WORKSPACE,
        variables: {
          organisationName: "",
          workspaceName: "",
        },
      },
      result: {
        data: {
          workspace: null,
        },
      },
    },
  ]

  render(<Chat />, { mocks })

  await waitFor(() => {
    expect(screen.queryByText("GrAI Workspace Chat")).not.toBeInTheDocument()
  })

  await waitFor(() => {
    expect(screen.getByText("Page not found")).toBeInTheDocument()
  })
})

test("error", async () => {
  const mocks = [
    {
      request: {
        query: GET_WORKSPACE,
        variables: {
          organisationName: "",
          workspaceName: "",
        },
      },
      error: new Error("An error occurred"),
    },
  ]

  render(<Chat />, { mocks })

  await waitFor(() => {
    expect(screen.queryByText("GrAI Workspace Chat")).not.toBeInTheDocument()
  })

  await waitFor(() => {
    expect(screen.getByText("An error occurred")).toBeInTheDocument()
  })
})
