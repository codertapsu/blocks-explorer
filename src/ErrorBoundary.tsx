import React, { Component } from 'react';

export class ErrorBoundary extends Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: any, errorInfo: any) {
    console.log(error);
    console.log(errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Some thing went wrong</h1>;
    }
    return this.props.children;
  }
}
