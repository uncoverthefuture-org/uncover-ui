import React = require("react")
import { PrimaryButton } from "../src/components"
import { HStack, Stack, StackDivider } from "@chakra-ui/react"


export default function Main() {
    return (
        <div className="p-3">
            <HStack>
                <PrimaryButton >
                    Button
                </PrimaryButton>
                <StackDivider />
                <PrimaryButton isLoading={true}>
                    Button
                </PrimaryButton>
            </HStack>
        </div>
    )
}