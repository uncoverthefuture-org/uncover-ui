import React = require("react")
import { PrimaryButton, PrimaryInput } from "../src/components"
import { HStack, StackDivider } from "@chakra-ui/react"


export default function Main() {
    return (
        <div className="p-3">
            <HStack>
                <PrimaryInput 
                    placeholder="Email Address"
                    size="md"
                    // width="auto"
                />
                <PrimaryButton size="lg" className="h-100">
                    Button
                </PrimaryButton>
            </HStack>
            <HStack>
                <PrimaryInput 
                    placeholder="Email Address"
                    size="lg"
                    className="py-3 h-auto"
                />
                <PrimaryButton size="lg" className="h-100" >
                    Button
                </PrimaryButton>
                <StackDivider />
                <PrimaryButton  isLoading={true}>
                    Button
                </PrimaryButton>
            </HStack>
        </div>
    )
}